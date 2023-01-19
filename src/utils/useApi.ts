import { isRef, Ref, ref, watchEffect } from 'vue';

export function useApi<T extends (...args: any[]) => any>({
  queryFn,
  params,
}: {
  queryFn: T;
  params?: Parameters<T>[0];
}): {
  data: Ref<Awaited<ReturnType<T> | null>>;
  error: Ref<unknown | null>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
} {
  const data = ref<Awaited<ReturnType<T> | null>>(null);
  const error = ref<unknown | null>(null);
  const isLoading = ref(true);
  const isError = ref(false);

  const doExecute = async () => {
    isLoading.value = true;
    isError.value = false;
    data.value = null;
    error.value = null;

    try {
      data.value = await queryFn(params);
    } catch (e) {
      isError.value = true;
      error.value = e;
    }
    isLoading.value = false;
  };

  if (isRef(params)) {
    watchEffect(doExecute);
  } else {
    doExecute();
  }

  return { data, error, isLoading, isError };
}
