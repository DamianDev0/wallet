import { ValidationRule } from '@type/form.types';

export class FormValidator {
  static validate(value: any, rules: ValidationRule[]): string | null {
    for (const rule of rules) {
      const error = this.validateRule(value, rule);
      if (error) return error;
    }
    return null;
  }

  private static validateRule(value: any, rule: ValidationRule): string | null {
    switch (rule.type) {
      case 'required':
        return this.required(value, rule.message);
      case 'email':
        return this.email(value, rule.message);
      case 'minLength':
        return this.minLength(value, rule.value, rule.message);
      case 'maxLength':
        return this.maxLength(value, rule.value, rule.message);
      case 'min':
        return this.min(value, rule.value, rule.message);
      case 'max':
        return this.max(value, rule.value, rule.message);
      case 'pattern':
        return this.pattern(value, rule.value, rule.message);
      case 'custom':
        return this.custom(value, rule.value, rule.message);
      default:
        return null;
    }
  }

  private static required(value: any, message: string): string | null {
    if (value === null || value === undefined || value === '') {
      return message;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return message;
    }
    return null;
  }

  private static email(value: any, message: string): string | null {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? message : null;
  }

  private static minLength(value: any, minLength: number, message: string): string | null {
    if (!value) return null;
    return value.length < minLength ? message : null;
  }

  private static maxLength(value: any, maxLength: number, message: string): string | null {
    if (!value) return null;
    return value.length > maxLength ? message : null;
  }

  private static min(value: any, min: number, message: string): string | null {
    if (value === null || value === undefined || value === '') return null;
    const numValue = Number(value);
    return numValue < min ? message : null;
  }

  private static max(value: any, max: number, message: string): string | null {
    if (value === null || value === undefined || value === '') return null;
    const numValue = Number(value);
    return numValue > max ? message : null;
  }

  private static pattern(value: any, pattern: RegExp, message: string): string | null {
    if (!value) return null;
    return !pattern.test(value) ? message : null;
  }

  private static custom(value: any, validator: (value: any) => boolean, message: string): string | null {
    if (typeof validator !== 'function') return null;
    return !validator(value) ? message : null;
  }
}
