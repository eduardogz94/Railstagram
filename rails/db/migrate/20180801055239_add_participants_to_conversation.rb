class AddParticipantsToConversation < ActiveRecord::Migration[5.1]
  def change
    add_column :conversations, :participant, :integer, array: true
  end
end
