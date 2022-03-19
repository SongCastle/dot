class V1::UsersController < ApplicationController
  before_action :set_users_json, only: :index
  before_action :set_user_json, only: :show

  def index
    render_json
  end

  def show
    render_json
  end

  private

  def set_users_json
    users = User.order(id: :desc).limit(5)
    @json = UserSerializer.new(users, is_collection: true)
  end

  def set_user_json
    user = User.find_by(id: params[:id])
    raise NotFound if user.nil?

    @json = UserSerializer.new(user)
  end
end
