class CategoryRoom < ApplicationRecord
  belongs_to :room
  belongs_to :category
end
