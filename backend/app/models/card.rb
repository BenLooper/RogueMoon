class Card < ApplicationRecord
    has_many :owned_cards
    has_many :users, through: :owned_cards
end
