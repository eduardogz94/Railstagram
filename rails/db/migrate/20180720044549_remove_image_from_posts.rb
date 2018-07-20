class RemoveImageFromPosts < ActiveRecord::Migration[5.1]
  def change
    remove_column :posts, :image, :string
  end
end
