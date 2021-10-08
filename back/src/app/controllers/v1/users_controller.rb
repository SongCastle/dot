class V1::UsersController < ApplicationController
  def index
    users = User.order(id: :desc).limit(5)
    render json: users
  end

  def show
    user = User.find_by(id: params[:id])
    raise NotFound if user.nil?
    render json: user
  end
end
