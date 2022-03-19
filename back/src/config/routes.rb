Rails.application.routes.draw do
  namespace :v1 do
    resources :categories, only: [:index, :show] do
      resources :rooms, only: :index, controller: 'category_rooms'
    end

    resources :rooms, only: [:index, :show] do
      resources :categories, only: :index, controller: 'room_categories'
      resources :posts, only: [:index, :create], controller: 'room_posts'
    end
    get '/rooms/:id/avatar', controller: 'rooms', action: 'avatar'

    resources :users, only: [:index, :show]

    resource :search, only: [] do
      resources :rooms, only: :index, controller: 'search_rooms'
    end
  end
end
