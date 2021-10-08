class User < ApplicationRecord
  has_many :categories, foreign_key: :creator_id

  # 自身が作成したルーム
  has_many :own_rooms, foreign_key: :creator_id, class_name: 'Room'
  # 自身が所属しているルーム
  has_many :room_users
  has_many :rooms, through: :room_users

  validates :login, uniqueness: true
end
