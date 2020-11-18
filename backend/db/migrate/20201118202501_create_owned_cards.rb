class CreateOwnedCards < ActiveRecord::Migration[6.0]
  def change
    create_table :owned_cards do |t|
      t.integer :user_id
      t.integer :card_id

      t.timestamps
    end
  end
end
