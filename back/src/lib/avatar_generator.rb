# TODO: gem 化に挑戦したい
# GitHub ライクなアバター画像をランダムに生成します。
#
# 以下の node package を Ruby に向けて変更したものです。
# @see https://github.com/vvanghelue/github-like-avatar-generator/blob/main/index.js
#
# 実行には ruby-vips が必要になります。
#

require 'ruby-vips'

module AvatarGenerator
  class EmptyImage
    def join(img, *); img; end
  end

  class InvalidFileName   < ArgumentError; end
  class InvalidBlocks     < ArgumentError; end
  class InvalidBlockSizes < ArgumentError; end

  DEFAULT_BLOCKS = 5
  DEFAULT_BLOCK_SIZE = 30

  class << self
    #
    # ランダムなアバター画像を生成します。
    # @param [String] filename ファイル名
    # @option [Integer] blocks 1 列あたりのブロック数
    # @option [Integer] block_size 1 ブロックあたりの pixel 数
    #
    # ```
    # # e.g.
    # AvatarGenerator.random_image('avatar.png', 5, 20) do |path|
    #   # something like ...
    #   # FileUtils.cp(path, <destination_path>)
    # end
    # ```
    #
    def random_image(filename, blocks=DEFAULT_BLOCKS, block_size=DEFAULT_BLOCK_SIZE)
      raise InvalidFileName   unless filename.is_a?(String)
      raise InvalidBlocks     unless blocks.is_a?(Integer) && blocks > 0
      raise InvalidBlockSizes unless block_size.is_a?(Integer) && block_size > 0

      half_blocks = (blocks / 2.0).ceil
      is_four, is_six = blocks == 4, blocks == 6

      dominant_color, dominant_color2 = rand * 256, rand * 256
      my_dominant_color = -> { rand > 0.9 ? dominant_color : dominant_color2 }

      pixcels =
        (half_blocks * blocks).times.map do |i|
          if is_four
            random_color(![4, 5, 6].include?(i), my_dominant_color.())
          elsif is_six
            random_color(![13, 14].include?(i), my_dominant_color.())
          else
            random_color
          end
        end

      i = 0
      image = EmptyImage.new
      half_blocks.times do
        row = EmptyImage.new
        blocks.times do
          row = row.join(
            Vips::Image.black(block_size, block_size) + pixcels[i],
            :vertical
          )
          i += 1
        end
        image = image.join(row, :horizontal)
      end

      flipped_image = image.flip(:horizontal)
      if blocks.odd?
        flipped_image = flipped_image.extract_area(
          block_size, 0, (blocks - half_blocks) * block_size, blocks * block_size
        )
      end

      write_avatar = -> (dir) do
        avatar = image.join(flipped_image, :horizontal)

        File.join(dir, filename).tap do |path|
          avatar.write_to_file(path)
        end
      end

      return write_avatar.(Dir.mktmpdir) unless block_given?

      Dir.mktmpdir do |tmp_dir|
        avatar_path = write_avatar.(tmp_dir)
        yield avatar_path
      end
    end

    private

    def random_color(can_be_blank=true, dominant_color=nil)
      return Array.new(3, (255 * 'AA'.hex / 255.0).floor) if (can_be_blank && rand < 0.3)

      if dominant_color
        delta = rand * 60 - 30
        color_value = (dominant_color + delta).floor
        color_value = [[color_value, 256].min, 0].max
      else
        color_value = (rand * 256).floor
      end

      hsl_to_rgb(color_value, 100, 80)
    end

    def hsl_to_rgb(h, s, l)
      h = 0 if h == 360
      l2 = l < 50 ? l : 100 - l
      s2 = s / 100.0

      max = (l + l2 * s2) * 2.55
      min = (l - l2 * s2) * 2.55

      f = -> x { (max - min) * x / 60.0 + min }

      r, g, b =
        if h <= 60
          [max, f.(h), min]
        elsif h <= 120
          [f.(120 - h), max, min]
        elsif h <= 180
          [min, max, f.(h - 120)]
        elsif h <= 240
          [min, f.(240 - h), max]
        elsif h <= 300
          [f.(h - 240), min, max]
        else
          [max, min, f.(360 - h)]
        end

      [r.round, g.round, b.round]
    end
  end
end
