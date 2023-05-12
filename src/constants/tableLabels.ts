import { TABLES } from "./tables";

export const getTableLabel = (table) => {
  if (table === TABLES.MAGIC_ETHEREAL_EFFECTS) {
    return "Magic Spells: Ethereal Effects";
  } else if (table === TABLES.MAGIC_ETHEREAL_ELEMENTS) {
    return "Magic Spells: Ethereal Elements";
  } else if (table === TABLES.MAGIC_ETHEREAL_FORMS) {
    return "Magic Spells: Ethereal Forms";
  } else if (table === TABLES.MAGIC_PHYSICAL_EFFECTS) {
    return "Magic Spells: Physical Effects";
  } else if (table === TABLES.MAGIC_PHYSICAL_ELEMENTS) {
    return "Magic Spells: Physical Elements";
  } else if (table === TABLES.MAGIC_PHYSICAL_FORMS) {
    return "Magic Spells: Physical Forms";
  } else if (table === TABLES.MAGIC_TABLE_ROLL) {
    return "Magic Spells: Table Roll";
  }

  return "UNNAMED_TABLE";
};
