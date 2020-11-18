class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :image
      t.string :flavor_text
      t.boolean :is_special
      t.string :type
      t.integer :strength
      t.string :ability

      t.timestamps
    end
  end
end
