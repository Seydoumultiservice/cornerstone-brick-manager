
/**
 * Formate un nombre en devise FCFA
 * @param amount - Montant à formater
 * @returns Chaîne formatée avec séparateurs de milliers et suffixe FCFA
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('fr-FR') + ' FCFA';
};

/**
 * Formate un nombre en pourcentage
 * @param value - Valeur à formater en pourcentage
 * @returns Chaîne formatée avec le symbole %
 */
export const formatPercent = (value: number): string => {
  return value.toLocaleString('fr-FR') + ' %';
};

/**
 * Formate un nombre avec des séparateurs de milliers
 * @param value - Valeur à formater
 * @returns Chaîne formatée avec séparateurs de milliers
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString('fr-FR');
};
