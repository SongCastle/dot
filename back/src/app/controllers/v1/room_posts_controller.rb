class V1::RoomPostsController < ApplicationController
  # TODO: 取得件数の制御
  def index
    @json = PostSerializer.new(target_room!.posts, is_collection: true)
    render_json
  end

  def create
    # TODO: params[:message] の検証
    post = Post.create!(
      room: target_room!,
      user: target_user!,
      message: params[:message]
    )
    @json = PostSerializer.new(post)
    render_json
  end

  private

  def target_room!
    raise BadRequest, code: 'blank_room_id' unless params.key?(:room_id)

    room_id = _params!(:room_id)
    room = Room.find_by(id: room_id.to_i)
    raise NotFound if room.nil?
    room
  end

  def target_user!
    unless params[:user_id].nil?
      user_id = _params!(:user_id)
      user = User.find_by(id: user_id.to_i)
      raise NotFound if user.nil?
      user
    end
  end

  def _params!(key)
    raise BadRequest, code: "blank_#{key}"   unless params.key?(key)
    raise BadRequest, code: "invalid_#{key}" unless params[key].is_a?(String)

    val = params[key][/^\d+$/]
    raise BadRequest, code: "invalid_#{key}" unless params[key] == val
    val
  end
end
