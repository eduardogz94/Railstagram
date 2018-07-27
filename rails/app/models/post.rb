class Post < ApplicationRecord
  belongs_to :user
  mount_base64_uploader :post_image, PostImageUploader

  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  
  default_scope -> { order(created_at: :desc) }

  validates :user_id, presence: true
  
end
