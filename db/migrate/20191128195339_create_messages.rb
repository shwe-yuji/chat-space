class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :body
      t.string :image
      t.references :group, foriegin_key: true
      t.references :user, foriegin_key: true
      t.timestamps
    end
  end
end