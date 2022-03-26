require 'github_like_avatar'

class Room < ApplicationRecord
  # TODO: dependent: :destroy の追加
  belongs_to :creator, class_name: 'User', optional: true

  has_many :room_users
  has_many :users, through: :room_users

  has_many :posts

  # 全てのカテゴリ
  has_many :category_rooms
  has_many :categories, through: :category_rooms
  # メインカテゴリ
  has_one :main_category_room
  has_one :main_category, through: :main_category_room, source: :category
  # サブカテゴリ
  has_many :sub_category_rooms
  has_many :sub_categories, through: :sub_category_rooms, source: :category

  has_one_attached :image

  # TODO: 画像サイズの制限
  # IMAGE_LIMIT_SIZE = 256
  # has_one_attached :image do |attachable|
  #   attachable.variant(:thumb, resize_to_limit: [IMAGE_LIMIT_SIZE, IMAGE_LIMIT_SIZE])
  # end

  after_create -> room { room.create_default_image }

  scope :search, -> query do
    left_joins(:categories).
      where(rooms: {name: query}).
      or(where(categories: {name: query})).uniq
  end

  def create_default_image
    return if image.attached?

    blob =
      GitHubLikeAvatar.generate(filename = "room-#{id}.png") do |path|
        File.open(path, 'rb') do |o|
          ActiveStorage::Blob.create_and_upload!(io: o, filename: filename)
        end
      end

    image.attach(blob)
  rescue => e
    Rails.logger.error("Fail to create default avatar / Room##{id}")
    Rails.logger.error(e.backtrace.join(?\n))
    nil
  end
end
