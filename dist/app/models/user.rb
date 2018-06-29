class User < ApplicationRecord
    before_save { username.downcase }
    
    validates :username,  presence: true,
    uniqueness: { case_sensitive: false }
    
    validates :password, presence: true, length: { minimum: 6 }
    
end
