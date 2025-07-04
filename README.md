# StaffMode Plugin

A comprehensive PocketMine-MP staff mode plugin with inventory management, database integration, and essential staff tools.

## Features

- **Staff Mode Toggle**: Easy `/staffmode on/off` command
- **Permission-Based Access**: Secure permission system
- **Custom Staff Inventory**: Essential staff tools in a custom inventory
- **Database Integration**: Uses libasynql for optimal performance
- **Inventory Management**: Automatic save/restore of player inventories
- **Staff Tools**:
  - Invisibility toggle
  - Teleport to players
  - Freeze/unfreeze players
  - Random teleport
  - Player information viewer
  - World teleport
  - Staff list
  - Settings menu

## Installation

1. Download the plugin files
2. Place them in your `plugins` folder
3. Install the libasynql dependency
4. Restart your server
5. Configure the plugin in `config.yml`

## Dependencies

- **libasynql**: Required for database operations
- **PocketMine-MP**: API 5.0.0+
- **PHP**: 8.1+ (64-bit)

## Configuration

Edit `config.yml` to customize:
- Database settings (SQLite/MySQL)
- Staff mode behavior
- Staff items and their properties
- Messages and notifications
- Debug options

## Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/staffmode <on\|off>` | Toggle staff mode | `staffmode.use` |
| `/staffmode` | Toggle staff mode | `staffmode.use` |
| `/sm <on\|off>` | Alias for staffmode | `staffmode.use` |
| `/staff <on\|off>` | Alias for staffmode | `staffmode.use` |

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `staffmode` | Base staff mode permission | op |
| `staffmode.use` | Use staff mode toggle | op |
| `staffmode.freeze` | Freeze players | op |
| `staffmode.teleport` | Teleport to players | op |
| `staffmode.vanish` | Toggle invisibility | op |
| `staffmode.bypass` | Bypass staff mode restrictions | op |

## Staff Items

When in staff mode, you receive a custom inventory with these items:

1. **Invisibility Toggle** (Clock) - Toggle your visibility
2. **Teleport to Player** (Compass) - Teleport to any player
3. **Freeze Player** (Packed Ice) - Freeze/unfreeze players
4. **Random Teleport** (Ender Pearl) - Teleport to random player
5. **Player Information** (Player Head) - View player details
6. **World Teleport** (Grass Block) - Switch between worlds
7. **Staff List** (Book) - View online staff members
8. **Staff Settings** (Redstone) - Configure staff preferences

## Database Setup

### SQLite (Default)
No additional setup required. The plugin creates a SQLite database automatically.

### MySQL
1. Create a MySQL database
2. Update the MySQL configuration in `config.yml`
3. The plugin will create the necessary tables automatically

## API Usage

The plugin provides a comprehensive API for developers:

```php
// Get staff manager instance
$staffManager = StaffMode::getInstance()->getStaffManager();

// Check if player is in staff mode
$isInStaffMode = $staffManager->isInStaffMode($player);

// Toggle staff mode
$staffManager->toggleStaffMode($player);

// Get frozen players
$frozenPlayers = $staffManager->getFrozenPlayers();
```
