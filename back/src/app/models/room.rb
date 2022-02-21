class Room < ApplicationRecord
  belongs_to :creator, class_name: 'User', optional: true

  has_many :room_users
  has_many :users, through: :room_users

  # 全てのカテゴリ
  has_many :category_rooms
  has_many :categories, through: :category_rooms
  # メインカテゴリ
  has_one :main_category_room
  has_one :main_category, through: :main_category_room, source: :category
  # サブカテゴリ
  has_many :sub_category_rooms
  has_many :sub_categories, through: :sub_category_rooms, source: :category

  scope :search, -> (query) do
    left_joins(:categories).
      where(rooms: {name: query}).
      or(where(categories: {name: query})).uniq
  end
end
