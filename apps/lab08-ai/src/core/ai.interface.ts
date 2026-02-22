import { Schema } from "firebase/ai";


export interface Base64Image {
  base64: string;    // ไม่มี prefix "data:image/..;base64,"
  mimeType: string;  // image/jpeg, image/png
}
export interface ImageAnalysisResult {
  caption: string;          // คำบรรยายภาพ 1 ประโยค
  tags: string[];           // keyword สั้น ๆ
  objects?: Array<{
    name: string;
    confidence?: number;    // 0..1 (ถ้าตอบได้)
  }>;
  safety?: {
    isSensitive: boolean;
    notes?: string;
  };
}


export const imageAnalysisSchema = Schema.object({
  properties: {
    caption: Schema.string(),
    tags: Schema.array({ items: Schema.string() }),
    objects: Schema.array({
      items: Schema.object({
        properties: {
          name: Schema.string(),
          confidence: Schema.number(),
        },
        optionalProperties: ["confidence"],
      }),
    }),
    safety: Schema.object({
      properties: {
        isSensitive: Schema.boolean(),
        notes: Schema.string(),
      },
      optionalProperties: ["notes"],
    }),
  },
  optionalProperties: ["objects", "safety"],
});


