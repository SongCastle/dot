class Category < ApplicationRecord
  has_many :category_rooms
  has_many :rooms, through: :category_rooms

  belongs_to :creator, class_name: 'User', optional: true

  scope :only_main, -> {
    joins("INNER JOIN `category_rooms` ON `category_rooms`.`category_id` = `categories`.`id` AND `category_rooms`.`type` = '#{MainCategoryRoom.to_s}'").distinct
  }

  scope :only_sub, -> {
    joins("INNER JOIN `category_rooms` ON `category_rooms`.`category_id` = `categories`.`id` AND `category_rooms`.`type` = '#{SubCategoryRoom.to_s}'").distinct
  }
end
