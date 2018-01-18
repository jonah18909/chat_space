class RemoveStringFromMessages < ActiveRecord::Migration[5.0]
  def up
    remove_column :messages, :string, :string
  end
end
