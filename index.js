require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");


// =====================================
// HAVOC STYX SETTINGS
// =====================================

const OWNER_ID = "1347412485426380930";

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

const DATA_FILE = path.join(
  __dirname,
  "tiers.json"
);


// =====================================
// EXPRESS API
// =====================================

const app = express();

app.use(cors());

app.use(express.json());


// =====================================
// TIER DATA
// =====================================

function loadTiers() {

  if (!fs.existsSync(DATA_FILE)) {

    const defaultTiers = {
      T1: [],
      T2: [],
      T3: [],
      T4: [],
      T5: []
    };

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(
        defaultTiers,
        null,
        2
      )
    );

    return defaultTiers;
  }

  try {

    return JSON.parse(
      fs.readFileSync(
        DATA_FILE,
        "utf8"
      )
    );

  } catch {

    return {
      T1: [],
      T2: [],
      T3: [],
      T4: [],
      T5: []
    };

  }
}


function saveTiers(tiers) {

  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(
      tiers,
      null,
      2
    )
  );

}


// =====================================
// DISCORD CLIENT
// =====================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});


// =====================================
// SLASH COMMANDS
// =====================================

const commands = [

  new SlashCommandBuilder()

    .setName("tier")

    .setDescription(
      "Manage the HAVOC STYX tier list"
    )


    // ================================
    // ADD
    // ================================

    .addSubcommand(sub =>
      sub

        .setName("add")

        .setDescription(
          "Add a player to a tier"
        )

        .addStringOption(option =>
          option

            .setName("player")

            .setDescription(
              "Minecraft player name"
            )

            .setRequired(true)
        )

        .addStringOption(option =>
          option

            .setName("rank")

            .set
