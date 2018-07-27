class AddCommentsToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :comments, :integer, :default => 0
  end
end
