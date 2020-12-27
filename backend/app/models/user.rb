class User < ApplicationRecord
    has_many :games 
    has_many :owned_cards
    has_many :cards, through: :owned_cards

    validates :username, uniqueness: true 
    has_secure_password
end
