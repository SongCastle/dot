class V1::RoomPostsController < ApplicationController
  DEFAULT_LIMIT = 20
  MAXIMUM_LIMIT = 100

  def index
    meta = {
      offset: _params!(:offset),
      limit: _params!(:limit)&.to_i || DEFAULT_LIMIT
    }
    raise BadRequest, code: 'too_large_limit' if meta[:limit] > MAXIMUM_LIMIT

    posts = target_room!.posts
    meta[:total] = posts.count
    posts = posts.order(id: :desc).limit(meta[:limit])

    posts = posts.where('`id` < ?', meta[:offset]) unless meta[:offset].to_i.zero?

    @json = PostSerializer.new(posts, is_collection: true, meta: meta)
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
    room_id = _path_params!(:room_id)
    room = Room.find_by(id: room_id.to_i)
    raise NotFound if room.nil?
    room
  end

  def target_user!
    user_id = _params!(:user_id)
    return nil if user_id.nil?
    user = User.find_by(id: user_id.to_i)
    raise NotFound if user.nil?
    user
  end

  def _path_params!(key)
    val = params[key][/^\d+$/]
    raise BadRequest, code: "invalid_#{key}" unless params[key] == val
    val
  end

  def _params!(key)
    return nil unless params.key?(key)
    raise BadRequest, code: "invalid_#{key}" unless params[key].is_a?(String)
    _path_params!(key)
  end
end
