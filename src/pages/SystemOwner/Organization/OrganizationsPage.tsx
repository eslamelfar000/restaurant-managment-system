import { motion } from "framer-motion";
import { OrganizationsList } from "@/modules/SystemOwner/Organizations/OrganizationsList";

const OrganizationsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <OrganizationsList />
    </motion.div>
  );
};

export default OrganizationsPage;
