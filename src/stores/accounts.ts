import { defineStore } from "pinia";

interface Account {
  id: number;
  labelsStr: string;
  labels: Array<{ text: string }>;
  type: "Локальная" | "LDAP";
  login: string;
  password: string | null;
  loginError: boolean;
  passwordError: boolean;
  labelsError: boolean;
  showPassword: boolean,
}

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem("accounts-store") || "[]") as Account[],
  }),

  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now(),
        labelsStr: "",
        labels: [],
        type: "Локальная",
        login: "",
        password: "",
        loginError: false,
        passwordError: false,
        labelsError: false,
        showPassword: false,
      });
      this.saveToLocalStorage();
    },

    deleteAccount(id: number) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id);
      this.saveToLocalStorage();
    },

    formatLabels(account: Account) {
      if (account.labelsStr.length > 50) {
        account.labelsError = true;
        return;
      }

      account.labels = account.labelsStr
        .split(";")
        .map((text) => text.trim())
        .filter((text) => text)
        .map((text) => ({ text }));

      account.labelsError = false;
      this.saveToLocalStorage();
    },

    validateAccount(account: Account) {
      account.loginError = !account.login || account.login.length > 100;
      account.passwordError =
        account.type === "Локальная" && (!account.password || account.password.length > 100);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("accounts-store", JSON.stringify(this.accounts));
    },
  },
});
