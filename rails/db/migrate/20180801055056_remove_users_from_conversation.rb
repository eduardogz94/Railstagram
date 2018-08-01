class RemoveUsersFromConversation < ActiveRecord::Migration[5.1]
  def change
    remove_column :conversations, :users, :string
  end
end
