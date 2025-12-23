import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface OnboardingInputProps {
  placeholder: string;
  onSubmit: (value: string) => void;
  type?: "text" | "select" | "textarea" | "url" | "urls" | "keywords";
  options?: string[];
  multiSelect?: boolean;
  label?: string;
}

const OnboardingInput = ({
  placeholder,
  onSubmit,
  type = "text",
  options = [],
  multiSelect = false,
  label,
}: OnboardingInputProps) => {
  const [value, setValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([""]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");

  const handleSubmit = () => {
    if (type === "select") {
      if (multiSelect) {
        if (selectedOptions.length > 0) {
          onSubmit(selectedOptions.join(", "));
        }
      } else {
        if (selectedOptions.length > 0) {
          onSubmit(selectedOptions[0]);
        }
      }
    } else if (type === "urls") {
      const validUrls = urls.filter((url) => url.trim() !== "");
      if (validUrls.length > 0) {
        onSubmit(validUrls.join(", "));
      }
    } else if (type === "keywords") {
      if (keywords.length > 0) {
        onSubmit(keywords.join(", "));
      }
    } else {
      if (value.trim() !== "") {
        onSubmit(value);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleOption = (option: string) => {
    if (multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const addUrl = () => {
    if (urls.length < 3) {
      setUrls([...urls, ""]);
    }
  };

  const updateUrl = (index: number, url: string) => {
    const newUrls = [...urls];
    newUrls[index] = url;
    setUrls(newUrls);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() !== "" && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-4">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      )}
      
      {type === "select" ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => toggleOption(option)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedOptions.includes(option)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      ) : type === "textarea" ? (
        <div className="space-y-3">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <Button onClick={handleSubmit} disabled={!value.trim()} className="w-full">
            Continue
          </Button>
        </div>
      ) : type === "urls" ? (
        <div className="space-y-3">
          {urls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder={`Competitor website URL ${index + 1}${index === 0 ? " (required)" : ""}`}
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {urls.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeUrl(index)}
                  className="px-4"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          {urls.length < 3 && (
            <Button
              type="button"
              variant="outline"
              onClick={addUrl}
              className="w-full"
            >
              Add Another URL ({urls.length}/3)
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={urls.filter((url) => url.trim() !== "").length === 0}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      ) : type === "keywords" ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordKeyDown}
              placeholder={placeholder || "Enter a keyword and press Enter or comma"}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button type="button" onClick={addKeyword} variant="outline">
              Add
            </Button>
          </div>
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <motion.div
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20"
                >
                  <span className="text-sm">{keyword}</span>
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="text-primary hover:text-primary/70 text-lg leading-none"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </div>
          )}
          <Button
            onClick={handleSubmit}
            disabled={keywords.length === 0}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type={type === "url" ? "url" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button onClick={handleSubmit} disabled={!value.trim()} className="w-full">
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default OnboardingInput;
