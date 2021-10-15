# ユーザを作成
users = 5.times.map do |i|
  if i.even?
    User.create!(login: "dot#{i}")
  else
    User.create!(login: "dot#{i}", email: "dot#{i}@sample.com")
  end
end

# カテゴリを作成
categories = 10.times.map do |i|
  if i.even?
    Category.create!(name: "Category#{i}")
  else
    Category.create!(name: "Category#{i}", creator: users.sample)
  end
end

# ルームを作成
Room.create!(name: 'WithoutCreator')
Room.create!(name: 'WithCreator', creator: users.sample)

room = Room.create!(name: 'WithUsers')
users.sample(3).each do |user|
  RoomUser.create!(room: room, user: user)
end

room, main_category = Room.create!(name: 'WithMainCategory'), categories.sample
MainCategoryRoom.create!(category: main_category, room: room)

room, sub_categories = Room.create!(name: 'WithSubCategories'), categories.sample(2)
SubCategoryRoom.create!(category: sub_categories[0], room: room)
SubCategoryRoom.create!(category: sub_categories[1], room: room)

room, all_categories = Room.create!(name: 'WithAllCategories'), categories.sample(3)
MainCategoryRoom.create!(category: all_categories[0], room: room)
SubCategoryRoom.create!(category: all_categories[1], room: room)
SubCategoryRoom.create!(category: all_categories[2], room: room)
