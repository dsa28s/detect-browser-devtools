import 'reflect-metadata';

const requiredMetadataKey = Symbol('Required');

export const Required = (target: Object, key: string | symbol, index: number) => {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, key) || [];
  existingRequiredParameters.push(index);

  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, key);
};

export const CheckRequiredParameters = (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
  const method = descriptor.value;
  descriptor.value = function () {
    const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (const parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error(`Missing parameters ${propertyName} method.`);
        }
      }
    }

    return method.apply(this, arguments);
  };
};
