// Mapping between Telegram usernames and Linear users
// Format: telegramUsername (without @) -> { linearName, linearEmail }
//
// Configure this file with your team members to enable:
// - Automatic assignee resolution from Telegram messages
// - AI-powered name matching with aliases
// - "assign me" / "for me" resolution based on sender

export interface UserMapping {
  telegramUsername: string;
  linearName: string;
  linearEmail: string;
  aliases: string[]; // Alternative names that can be used to refer to this person
}

/**
 * USER_MAPPINGS Configuration
 * 
 * Add your team members here. Each entry maps a Telegram user to their Linear account.
 * 
 * Example entry:
 * {
 *   telegramUsername: 'john_doe',      // Telegram username without @
 *   linearName: 'john',                 // Name as it appears in Linear
 *   linearEmail: 'john@yourcompany.com', // Email used in Linear
 *   aliases: ['john', 'johnny', 'jd'],  // Alternative names to match
 * }
 */
export const USER_MAPPINGS: UserMapping[] = [
  // Example users - replace with your team members
  {
    telegramUsername: 'example_user',
    linearName: 'example',
    linearEmail: 'example@yourcompany.com',
    aliases: ['example', 'ex'],
  },
  // Add more team members here:
  // {
  //   telegramUsername: 'alice_dev',
  //   linearName: 'alice',
  //   linearEmail: 'alice@yourcompany.com',
  //   aliases: ['alice', 'al'],
  // },
  // {
  //   telegramUsername: 'bob_pm',
  //   linearName: 'bob',
  //   linearEmail: 'bob@yourcompany.com',
  //   aliases: ['bob', 'bobby'],
  // },
];

// Helper function to find Linear user by any identifier (telegram username, name, alias)
export function findLinearUserByIdentifier(identifier: string): UserMapping | null {
  const normalizedId = identifier.toLowerCase().replace('@', '');
  
  return USER_MAPPINGS.find((user) => {
    return (
      user.telegramUsername.toLowerCase() === normalizedId ||
      user.linearName.toLowerCase() === normalizedId ||
      user.linearEmail.toLowerCase() === normalizedId ||
      user.aliases.some((alias) => alias.toLowerCase() === normalizedId)
    );
  }) ?? null;
}

// Get all aliases for AI prompt
export function getAllUserAliases(): string[] {
  const aliases: string[] = [];
  for (const user of USER_MAPPINGS) {
    aliases.push(user.telegramUsername);
    aliases.push(user.linearName);
    aliases.push(...user.aliases);
  }
  return [...new Set(aliases)];
}
