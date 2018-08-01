class AddUsersToConversation < ActiveRecord::Migration[5.1]
  def change
    add_column :conversations, :users, :string, array: true, default: [] 
  end
end
