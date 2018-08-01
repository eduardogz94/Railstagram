class AddConversationIdToMessages < ActiveRecord::Migration[5.1]
  def change
    add_reference :messages, :conversation, foreign_key: true
  end
end
