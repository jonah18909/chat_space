class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :text
      t.string :string
      t.string :image
      t.string :string

      t.timestamps
    end
  end
end
