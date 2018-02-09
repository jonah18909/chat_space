class AddUserRefToMessages < ActiveRecord::Migration[5.0]
  def change
    add_reference :messages, :user, foreign_key: true, index: true
    add_reference :messages, :group, foreign_key: true, index: true
  end
end
