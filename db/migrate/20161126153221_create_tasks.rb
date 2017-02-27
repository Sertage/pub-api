class CreateTasks < ActiveRecord::Migration[5.0]
  
  def self.up
    create_table :tasks do |t|
      t.string :name, null: false, limit: 30
      t.string :path, null: false, limit: 255
      t.timestamp :start_at, null: false
      t.timestamp :end_at, null: false
      t.string :days, null: false, limit: 15
      t.time  :hour, null: false
      t.integer :server_id, null: false
      t.boolean :active, null: false, default: true
      t.timestamps null: false
    end
    
    add_foreign_key :tasks, :servers
    
    add_index :tasks, :name
    add_index :tasks, [:start_at,:end_at] 
    add_index :tasks, :server_id
  end
  
  def self.down
    drop_table :tasks
  end
  
end
