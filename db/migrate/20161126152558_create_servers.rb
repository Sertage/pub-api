class CreateServers < ActiveRecord::Migration[5.0]
  def self.up
    create_table :servers do |t|
      t.string :name, null: false, limit: 80
      t.boolean :active, null: false, default: true
      t.timestamps null: false
    end
    
    add_index :servers, :name, unique: true
  end
  
  def self.down
    drop_table :servers
  end
end
