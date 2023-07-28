class User < ApplicationRecord
    has_secure_password

    has_many :user_roles
    has_many :roles, through: :user_roles
    has_many :reviews
    has_many :orders

    validates :username, {
        presence: true,
        length: {minimum:4} 
    }
    validates :email, {
        presence: true,
        length: {minimum:6}
    }
    validates :password, {
        presence: true,
        length: {minimum:4}
    }
end
