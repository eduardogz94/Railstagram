class User < ApplicationRecord
    before_save { self.username = username.downcase }
    
    validates :username,  presence: true, uniqueness: { case_sensitive: false }
    
    has_secure_password
    validates :password, presence: true
    
    def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

end
