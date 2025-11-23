

import {
  createLink,
  findLinkByCode,
  getAllLinks,
  deleteLink,
  incrementClick,
} from "../models/linkModel.js";

export const createShortLink = async (req, res) => {
  try {
    const { original_url, code } = req.body;

    if (!original_url)
      return res.status(400).json({ error: "URL required" });

    const exists = await findLinkByCode(code);
    if (exists) return res.status(409).json({ error: "Code already exists" });

    const newLink = await createLink(code, original_url);

    res.status(201).json(newLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getLinks = async (req, res) => {
  const data = await getAllLinks();
  res.json(data);
};

export const getLinkStats = async (req, res) => {
  const { code } = req.params;
  const link = await findLinkByCode(code);

  if (!link) return res.status(404).json({ error: "Link not found" });

  res.json(link);
};

export const deleteShortLink = async (req, res) => {
  const { code } = req.params;

  const link = await findLinkByCode(code);
  if (!link) return res.status(404).json({ error: "Not found" });

  await deleteLink(code);
  res.json({ message: "Deleted successfully" });
};

export const redirectCode = async (req, res) => {
  const { code } = req.params;

  const link = await findLinkByCode(code);

  if (!link) return res.status(404).send("Not found");

  await incrementClick(code);

  return res.redirect(302, link.original_url);
};
