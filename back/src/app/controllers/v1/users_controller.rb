class V1::UsersController < ApplicationController
  before_action :set_users, only: :index
  before_action :set_user, only: :show

  def index
    render json: @users
  end

  def show
    render json: @user
  end

  private

  def set_users
    @users = User.order(id: :desc).limit(5)
  end

  def set_user
    @user = User.find_by(id: params[:id])
    raise NotFound if @user.nil?
  end
end
