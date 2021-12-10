Rails.application.routes.draw do
  namespace :v1 do
    resources :categories, only: [:index, :show] do
      resources :rooms, only: :index, controller: 'category_rooms'
    end

    resources :rooms, only: [:index, :show] do
      resources :categories, only: :index, controller: 'room_categories'
    end

    resources :users, only: [:index, :show]
  end
end
