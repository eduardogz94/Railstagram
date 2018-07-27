class User < ApplicationRecord
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy

    before_save { self.username = username.downcase }
    mount_base64_uploader :picture, PictureUploader

    validates :username,  presence: true, uniqueness: { case_sensitive: false }
    
    has_secure_password
    validates :password_digest, presence: true
    
    def User.digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? 
        BCrypt::Engine::MIN_COST : 
        BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

end
