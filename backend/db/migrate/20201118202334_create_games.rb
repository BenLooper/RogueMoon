class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :user_id
      t.integer :round1_score
      t.integer :round2_score
      t.integer :round3_score
      t.boolean :game_won

      t.timestamps
    end
  end
end
