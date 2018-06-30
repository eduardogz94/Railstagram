class User < ApplicationRecord
    before_save { self.username = username.downcase }
    
    validates :username,  presence: true, uniqueness: { case_sensitive: false }
    
    validates :password, presence: true
    has_secure_password
    
end
