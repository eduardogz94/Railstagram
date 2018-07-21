class Post < ApplicationRecord
  belongs_to :user
  mount_base64_uploader :post_image, PostImageUploader

  default_scope -> { order(created_at: :desc) }

  validates :user_id, presence: true
  
end
