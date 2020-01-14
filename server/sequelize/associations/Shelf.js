module.exports = models => {
  const {
    Shelf,
    User,
    ShelfItem,
    PermissionLevel,
  } = models;

  Shelf.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });

  Shelf.belongsTo(PermissionLevel, {
    foreignKey: 'permissionLevel',
    onDelete: 'SET NULL',
  });

  Shelf.belongsTo(User, {
    foreignKey: 'permissionLevel',
    onDelete: 'CASCADE',
  });

  Shelf.hasMany(ShelfItem);

  return Shelf;
}