class User < ApplicationRecord
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy

    has_many :active_relationships, class_name:  "Relationship",
    foreign_key: "follower_id",
    dependent:   :destroy

    has_many :passive_relationships, class_name:  "Relationship",
    foreign_key: "followed_id",
    dependent:   :destroy

    has_many :following, through: :active_relationships,  source: :followed
    has_many :followers, through: :passive_relationships, source: :follower

    # before_save { self.username = username.downcase }
    mount_base64_uploader :picture, PictureUploader

    # validates :username,  presence: true, uniqueness: { case_sensitive: false }
    
    has_secure_password
    # validates :password_digest, presence: true
    
    def User.digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? 
        BCrypt::Engine::MIN_COST : 
        BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

    # Follows a user.
    def follow(other_user)
        active_relationships.create(followed_id: other_user.id)
    end

    # Unfollows a user.
    def unfollow(other_user)
        following.delete(other_user)
    end

    # Returns true if the current user is following the other user.
    def following?(other_user)
        following.include?(other_user)
    end

end
