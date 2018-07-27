class FixingPostTable < ActiveRecord::Migration[5.1]
  def change
    remove_column :posts, :comment
    remove_column :posts, :like
  end
end
