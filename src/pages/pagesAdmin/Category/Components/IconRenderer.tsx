import * as LucideIcons from 'lucide-react';
import React from 'react';

export function IconRenderer({ name }: { name: string }) {
  if (!name || !(name in LucideIcons)) {
    return <span className="text-xs text-red-500">Icono inválido</span>;
  }

  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.FC<React.SVGProps<SVGSVGElement>>;

  return <IconComponent className="w-5 h-5 mx-auto" />;
}
